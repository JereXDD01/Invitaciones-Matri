import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

export interface Guest {
  id: string;
  name: string;
  type?: 'adult' | 'child';
  attendance?: 'yes' | 'no' | '';
}

export interface Invitation {
  id: string;
  groupName: string;
  createdAt: string;
  guests: Guest[];
  dietary?: string;
  submittedAt?: string;
}

// GET /api/invitations -> returns all invitations
export async function GET() {
  try {
    const q = query(collection(db, 'invitations'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const invitations = snapshot.docs.map(doc => doc.data() as Invitation);
    return NextResponse.json(invitations);
  } catch (error) {
    console.error('Error fetching invitations from Firebase:', error);
    return NextResponse.json({ error: 'Error al obtener las invitaciones' }, { status: 500 });
  }
}

// POST /api/invitations -> create a new invitation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, groupName, guestItems, guestNames } = body;

    const rawGuests = guestItems || (Array.isArray(guestNames) ? guestNames.map((n: string) => ({ name: n, type: 'adult' })) : []);

    if (!groupName || !Array.isArray(rawGuests) || rawGuests.length === 0) {
      return NextResponse.json(
        { error: 'El nombre del grupo y al menos un invitado son requeridos.' },
        { status: 400 }
      );
    }

    // Create slug ID if not provided
    let slug = id
      ? id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : groupName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    if (!slug) {
      slug = `invitacion-${Date.now()}`;
    }

    // Ensure unique slug: we need to get existing slugs first to prevent collision, 
    // or we can just try to see if it exists. Since we need to get all to check:
    const snapshot = await getDocs(collection(db, 'invitations'));
    const existingIds = snapshot.docs.map(doc => doc.id);

    let finalSlug = slug;
    let counter = 1;
    while (existingIds.includes(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const newInvitation: Invitation = {
      id: finalSlug,
      groupName: groupName.trim(),
      createdAt: new Date().toISOString(),
      guests: rawGuests.map((item: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        name: typeof item === 'string' ? item.trim() : item.name.trim(),
        type: typeof item === 'object' && item.type ? item.type : 'adult',
        attendance: '',
      })),
      dietary: '',
      submittedAt: '',
    };

    // Save to Firebase
    await setDoc(doc(db, 'invitations', finalSlug), newInvitation);

    return NextResponse.json(newInvitation, { status: 201 });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Error al crear la invitación' }, { status: 500 });
  }
}

// DELETE /api/invitations?id=xxx -> delete an invitation
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }

    await deleteDoc(doc(db, 'invitations', id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return NextResponse.json({ error: 'Error al eliminar la invitación' }, { status: 500 });
  }
}
