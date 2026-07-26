import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/invitations.json');

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

function readInvitations(): Invitation[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading invitations:', error);
    return [];
  }
}

function writeInvitations(invitations: Invitation[]): boolean {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(invitations, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing invitations:', error);
    return false;
  }
}

// GET /api/invitations -> returns all invitations
export async function GET() {
  const invitations = readInvitations();
  return NextResponse.json(invitations);
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

    const invitations = readInvitations();

    // Create slug ID if not provided
    let slug = id
      ? id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : groupName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    if (!slug) {
      slug = `invitacion-${Date.now()}`;
    }

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 1;
    while (invitations.some(inv => inv.id === finalSlug)) {
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

    invitations.unshift(newInvitation);
    writeInvitations(invitations);

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

    let invitations = readInvitations();
    invitations = invitations.filter(inv => inv.id !== id);
    writeInvitations(invitations);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return NextResponse.json({ error: 'Error al eliminar la invitación' }, { status: 500 });
  }
}
