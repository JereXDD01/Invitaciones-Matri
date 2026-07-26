import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

// GET /api/invitations/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, 'invitations', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 });
    }

    return NextResponse.json(docSnap.data());
  } catch (error) {
    console.error('Error fetching invitation:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// PUT /api/invitations/[id] -> Update invitation details or RSVP status
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { groupName, guestItems, guestNames, attendance, dietary, newSlug } = body;

    const docRef = doc(db, 'invitations', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 });
    }

    const invitation = docSnap.data() as any;

    // Case 1: RSVP submit from client guest invitation page
    if (attendance && typeof attendance === 'object') {
      invitation.guests = invitation.guests.map((g: any) => {
        if (attendance[g.id] !== undefined) {
          return { ...g, attendance: attendance[g.id] };
        }
        return g;
      });
      if (dietary !== undefined) invitation.dietary = dietary;
      invitation.submittedAt = new Date().toISOString();
    }

    // Case 2: Full Edit from Admin Dashboard
    if (groupName !== undefined && (Array.isArray(guestItems) || Array.isArray(guestNames))) {
      invitation.groupName = groupName.trim();

      const rawItems = guestItems || (Array.isArray(guestNames) ? guestNames.map((n: string) => ({ name: n, type: 'adult' })) : []);

      // Map guest items to guest objects
      invitation.guests = rawItems.map((item: any, idx: number) => {
        const trimmedName = typeof item === 'string' ? item.trim() : item.name.trim();
        const itemType = typeof item === 'object' && item.type ? item.type : 'adult';
        
        const existingGuest = invitation.guests.find(
          (g: any) => g.name.toLowerCase() === trimmedName.toLowerCase()
        );

        return {
          id: existingGuest ? existingGuest.id : `${Date.now()}-${idx}`,
          name: trimmedName,
          type: itemType,
          attendance: existingGuest ? existingGuest.attendance : '',
        };
      });

      if (dietary !== undefined) invitation.dietary = dietary;

      // Handle Slug change
      if (newSlug && newSlug !== id) {
        invitation.id = newSlug;
        
        // If the slug changed, we must create a new document and delete the old one
        const newDocRef = doc(db, 'invitations', newSlug);
        const newDocSnap = await getDoc(newDocRef);
        
        if (newDocSnap.exists()) {
           return NextResponse.json({ error: 'El identificador ya está en uso por otra invitación.' }, { status: 400 });
        }
        
        await setDoc(newDocRef, invitation);
        // We can't use deleteDoc imported? Wait, I didn't import deleteDoc. I need to import it.
        const { deleteDoc } = require('firebase/firestore');
        await deleteDoc(docRef);
        
        return NextResponse.json(invitation);
      }
    }

    // Update the existing document
    await updateDoc(docRef, invitation);

    return NextResponse.json(invitation);
  } catch (error) {
    console.error('Error updating invitation:', error);
    return NextResponse.json({ error: 'Error al actualizar la invitación' }, { status: 500 });
  }
}
