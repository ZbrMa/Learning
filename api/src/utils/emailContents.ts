import { REGISTER_TEMPLATE, THANK_END, CHANGE_PASS_TEMPLATE } from "./emailTemplates";

const REGISTER_EMAIL_TEXT = {
  cs: {
    subject: "Vítej v Busk-Up",
    text: {
      title: "Vítej v Busk-Up!",
      greeting: (nick: string) =>
        `Ahoj, ${nick},<br />Jsme moc rádi, že jsi se připojil/a k naší komunitě!`,
      message:
        "Doufáme, že ti náš systém pomůže organizovat svá vystoupení a sdílet své umění se světem.",
        next: "Co dál?",
      steps: [
        "<b>Přihlas se do svého účtu:</b> Přihlas se do systému a prozkoumej všechny dostupné funkce.",
        "<b>Vytvoř svůj profil:</b> Ukaž světu, kdo jsi! Přidej svou fotografii a napiš, co děláš.",
        "<b>Začni plánovat:</b> Spravuj svůj kalendář a najdi vhodná místa k vystoupení.",
      ],
      footer:
        "Pokud budeš mít jakékoliv otázky, neváhej nás kontaktovat. Jsme tu, abychom ti pomohli!",
      thank: THANK_END.cs,
    },
  },
  en: {
    subject: "Welcome to Busk-Up",
    text: {
      title: "Welcome to Busk-Up!",
      greeting: (nick: string) =>
        `Hi, ${nick},<br />We are thrilled to have you join our community!`,
      message:
        "We hope our system helps you organize your performances and share your art with the world.",
        
        next: "What next?",
      steps: [
        "<b>Log in to your account:</b> Access the system and explore all the features available.",
        "<b>Create your profile:</b> Show the world who you are! Add your photo and share your art.",
        "<b>Start planning:</b> Manage your calendar and find great places to perform.",
      ],
      footer:
        "If you have any questions, feel free to contact us. We’re here to help!",
      thank: THANK_END.en,
    },
  },
  de: {
    subject: "Wilkommen in Busk-Up",
    text: {
      title: "Willkommen bei Busk-Up!",
      greeting: (nick: string) =>
        `Hallo, ${nick},<br />Wir freuen uns sehr, dich in unserer Community willkommen zu heißen!`,
      message:
        "Wir hoffen, dass unser System dir dabei hilft, deine Auftritte zu organisieren und deine Kunst mit der Welt zu teilen.",
        next:"was kommt als nächstes",
      steps: [
        "<b>Melde dich in deinem Konto an:</b> Logge dich in das System ein und entdecke alle verfügbaren Funktionen.",
        "<b>Erstelle dein Profil:</b> Zeige der Welt, wer du bist! Füge dein Foto hinzu und beschreibe deine Kunst.",
        "<b>Starte mit der Planung:</b> Verwalte deinen Kalender und finde passende Orte für deine Auftritte.",
      ],
      footer:
        "Wenn du Fragen hast, zögere nicht, uns zu kontaktieren. Wir sind hier, um dir zu helfen!",
      thank: THANK_END.de,
    },
  },
};

export const CHANGE_PASS_EMAIL_TEXT = {
    cs: {
      subject: "Resetování hesla",
      text: {
        title: "Resetování hesla",
        greeting: `Ahoj,<br />Na základě tvé žádosti jsme ti resetovali heslo.`,
        newPasswordMessage: "Tvé nové heslo je:",
        advice:
          "Po přihlášení doporučujeme ihned změnit heslo na nové.",
        contactMessage:
          "Pokud jsi nepožádal o reset hesla, prosím, ihned nás kontaktuj.",
        thankMessage: THANK_END.cs,
      },
    },
    en: {
      subject: "Password Reset",
      text: {
        title: "Password Reset",
        greeting:`Hi,<br />We have reset your password based on your request.`,
        newPasswordMessage: "Your new password is:",
        advice:
          "We recommend changing your password immediately after logging in.",
        contactMessage:
          "If you did not request a password reset, please contact us immediately.",
        thankMessage: THANK_END.en,
      },
    },
    de: {
      subject: "Passwort zurücksetzen",
      text: {
        title: "Passwort zurücksetzen",
        greeting:`Hallo,<br />Auf deine Anfrage hin haben wir dein Passwort zurückgesetzt.`,
        newPasswordMessage: "Dein neues Passwort lautet:",
        advice:
          "Wir empfehlen, dein Passwort sofort nach dem Einloggen zu ändern.",
        contactMessage:
          "Falls du keine Passwortänderung angefordert hast, kontaktiere uns bitte sofort.",
        thankMessage: THANK_END.de,
      },
    },
  };
  

export function generateRegisterEmail(
  lang: "cs" | "en" | "de",
  nick: string
): {subject:string,text:string} {
  const texts = REGISTER_EMAIL_TEXT[lang];
  return {subject: texts.subject, text: REGISTER_TEMPLATE(
    texts.text.title,
    texts.text.greeting(nick),
    texts.text.message,
    texts.text.next,
    texts.text.steps,
    texts.text.footer,
    texts.text.thank
  )};
};

export function generateChangePassEmail(
    lang: "cs" | "en" | "de",
    password:string
  ): {subject:string,text:string} {
    const emailContent = CHANGE_PASS_EMAIL_TEXT[lang];
    return {subject: emailContent.subject, text: CHANGE_PASS_TEMPLATE(
        emailContent.text.title,
        emailContent.text.greeting,
        emailContent.text.newPasswordMessage,
        password,
        emailContent.text.advice,
        emailContent.text.contactMessage,
        emailContent.text.thankMessage
    )};
  };
