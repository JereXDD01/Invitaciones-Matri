import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/invitations.json');

function readInvitations() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

function writeInvitations(invitations: any[]) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(invitations, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
  }
}

// GET /api/invitations/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const invitations = readInvitations();
  const invitation = invitations.find((inv: any) => inv.id === id);

  if (!invitation) {
    return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 });
  }

  return NextResponse.json(invitation);
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

    const invitations = readInvitations();
    const index = invitations.findIndex((inv: any) => inv.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 });
    }

    const invitation = invitations[index];

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

      // Handle slug change if provided
      if (newSlug && newSlug.trim() !== id) {
        const cleanSlug = newSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
        if (!invitations.some((inv: any) => inv.id === cleanSlug && inv.id !== id)) {
          invitation.id = cleanSlug;
        }
      }
    }

    invitations[index] = invitation;
    writeInvitations(invitations);

    return NextResponse.json(invitation);
  } catch (error) {
    console.error('Error updating invitation:', error);
    return NextResponse.json({ error: 'Error al actualizar la invitación' }, { status: 500 });
  }
}
