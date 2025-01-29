export const THANK_END = {
  cs: `<p style="font-size: 18px;">
              Děkujeme,<br />
              Tým <b>Busk-Up</b>
              </p>`,
  en: `<p style="font-size: 18px;">
          Thank you,<br />
          <b>Busk-Up</b> team
          </p>`,
  de: `<p style="font-size: 18px;">
          Vielen Dank,<br />
          Dein <b>Busk-Up</b>
        </p>
      `,
};

export const REGISTER_TEMPLATE = (
  title: string,
  greeting: string,
  message: string,
  next:string,
  steps: string[],
  footer: string,
  thank: string
) => `
    <div style="font-family: Arial, sans-serif; text-align: center; line-height: 1.6; padding: 20px; max-width: 600px; margin: 0 auto; font-size: 20px;">
      <img src="https://buskup.com/app-logo.png" alt="Busk-Up Logo" style="margin-bottom: 20px;" />
      <h1 style="font-weight: 600; margin-bottom: 20px; color: black;">${title}</h1>
      <p style="margin-bottom: 20px; color: #787878;">
        ${greeting}
      </p>
      <p style="margin-bottom: 40px; color: #787878;">
        ${message}
      </p>
      <h3 style="margin-bottom: 20px; color: #dc0000;">${next}</h3>
      <ul style="text-align: left; margin-bottom: 20px; color: #333333; padding-left: 40px;">
        ${steps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
      <p style="margin-bottom: 20px; color: #787878;">
        ${footer}
      </p>
      ${thank}
    </div>
  `;

export const CHANGE_PASS_TEMPLATE = (
  title: string,
  greeting: string,
  newPass: string,
  resetPass: string,
  tip: string,
  warning: string,
  thank: string
) => `<div style="font-family: Arial, sans-serif; text-align: center; line-height: 1.6; padding: 20px; max-width: 600px; margin: 0 auto; font-size:20px">
              <img src="https://buskup.com/app-logo.png"/>
                  <h1 style="font-weight:600; margin-bottom: 20px; color:black">${title}</h1>
                  <p style="margin-bottom: 20px; color:#787878;">
                    ${greeting}
                  </p>
                  <p style="margin-bottom: 20px; font-size: 24px;">
                  ${newPass} <b style="font-size: 24px; color: #dc0000;">${resetPass}</b>
                  </p>
                  <p style="margin-bottom: 20px; color:#787878;">
                    ${tip}<br>
                    ${warning}
                  </p>
                  ${thank}
              </div>`;
