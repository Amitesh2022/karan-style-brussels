import { NextResponse } from "next/server";

const phone = "32466076080";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body.message || "").slice(0, 500).toLowerCase();
  let reply = "Je peux vous renseigner sur nos services, l’adresse ou vous aider à préparer une demande de rendez-vous. Que souhaitez-vous savoir ?";
  if (/book|réserv|rendez|rdv|afspraak|appointment|disponib/.test(message)) {
    const text = encodeURIComponent("Bonjour Karan Saloon, je souhaite réserver un rendez-vous. Mon service souhaité : … Mon jour/heure préféré : …");
    reply = `Avec plaisir. Indiquez le service souhaité et le jour qui vous convient, puis finalisez avec le salon ici : https://wa.me/${phone}?text=${text}`;
  } else if (/prix|tarif|price|cost|kost|hoeveel/.test(message)) {
    reply = "Les tarifs peuvent dépendre du service choisi. Pour obtenir le prix exact, dites-moi si vous souhaitez une coupe, une barbe ou les deux — ou demandez directement au salon sur WhatsApp.";
  } else if (/service|coupe|barbe|hair|beard|knip|baard|fade|contour/.test(message)) {
    reply = "Karan Saloon propose les essentiels du grooming masculin : coupe, barbe et contours, formule coupe + barbe et conseil de style. Pour une demande particulière, envoyez une photo d’inspiration sur WhatsApp.";
  } else if (/adresse|address|waar|venir|route|itinéraire|location|parking/.test(message)) {
    reply = "Le salon se trouve Rue Longue Vie 44-22, 1050 Ixelles, Bruxelles. Vous pouvez ouvrir l’itinéraire depuis la section “Nous trouver” de cette page.";
  } else if (/heure|horaire|open|ouvert|uur|wanneer/.test(message)) {
    reply = "Les horaires ne sont pas encore affichés ici. Appelez le +32 466 07 60 80 ou écrivez sur WhatsApp pour confirmer l’ouverture et les disponibilités du jour.";
  } else if (/bonjour|hello|salut|hallo|hey/.test(message)) {
    reply = "Bonjour ! Je peux vous aider à choisir entre une coupe, un service barbe ou la formule complète, puis préparer votre demande de rendez-vous.";
  }
  return NextResponse.json({ reply });
}
