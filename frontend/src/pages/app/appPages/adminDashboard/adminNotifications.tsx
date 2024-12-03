import { INotification } from "../../../../types/notifications";
import { AdminDashboard } from "./adminDashboard";
import { NotificationContainer } from "./components/notificationContainer";

const notifications: INotification[] = [
  {
    id: 1,
    from: "info@company.com",
    to: "user1@example.com",
    subject: "Vítejte v našem systému!",
    content: "Děkujeme, že jste se zaregistrovali. Jsme rádi, že vás tu máme.",
    day: new Date("2024-12-03"),
    time: "10:00",
  },
  {
    id: 2,
    from: "support@company.com",
    to: "user2@example.com",
    subject: "Vaše žádost byla přijata",
    content:
      "Vaše žádost o podporu byla přijata. Budeme vás kontaktovat co nejdříve.",
    day: new Date("2024-12-02"),
    time: "14:30",
  },
  {
    id: 3,
    from: "events@company.com",
    to: "user3@example.com",
    subject: "Připomínka: Webinář začíná zítra",
    content: "Nezapomeňte se zúčastnit našeho webináře zítra v 15:00.",
    day: new Date("2024-12-03"),
    time: "09:00",
  },
  {
    id: 4,
    from: "news@company.com",
    to: "user4@example.com",
    subject: "Novinky za tento měsíc",
    content: "Zjistěte, co je nového v našem systému. Máme nové funkce!",
    day: new Date("2024-11-30"),
    time: "12:00",
  },
  {
    id: 5,
    from: "info@company.com",
    to: "user5@example.com",
    subject: "Ověření e-mailové adresy",
    content: "Klikněte na odkaz pro ověření vaší e-mailové adresy.",
    day: new Date("2024-12-01"),
    time: "08:45",
  },
  {
    id: 6,
    from: "promotions@company.com",
    to: "user6@example.com",
    subject: "Speciální nabídka jen pro vás!",
    content:
      "Vyzkoušejte naši novou službu s 20% slevou. Nabídka platí do konce týdne.",
    day: new Date("2024-12-03"),
    time: "17:15",
  },
  {
    id: 7,
    from: "reminders@company.com",
    to: "user7@example.com",
    subject: "Vaše heslo brzy vyprší",
    content:
      "Vaše heslo vyprší za 3 dny. Prosím, aktualizujte jej co nejdříve.",
    day: new Date("2024-12-01"),
    time: "11:00",
  },
  {
    id: 8,
    from: "team@company.com",
    to: "user8@example.com",
    subject: "Vaše recenze byla schválena",
    content:
      "Děkujeme za váš příspěvek! Vaše recenze je nyní viditelná pro ostatní uživatele.",
    day: new Date("2024-12-02"),
    time: "15:45",
  },
  {
    id: 9,
    from: "alerts@company.com",
    to: "user9@example.com",
    subject: "Bezpečnostní upozornění",
    content:
      "Zaznamenali jsme podezřelou aktivitu na vašem účtu. Pokud jste to nebyli vy, kontaktujte nás.",
    day: new Date("2024-12-03"),
    time: "18:30",
  },
  {
    id: 10,
    from: "updates@company.com",
    to: "user10@example.com",
    subject: "Nová aktualizace je k dispozici",
    content:
      "Stáhněte si nejnovější verzi naší aplikace a využijte nové funkce.",
    day: new Date("2024-12-03"),
    time: "07:15",
  },
];

export function AdminNotifications() {
  return (
    <AdminDashboard>
      <NotificationContainer flow="from" notifications={notifications} />
    </AdminDashboard>
  );
}
