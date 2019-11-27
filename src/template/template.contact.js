

class TemplateContact {
    
    static template(email , message){
        return `<div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.0em;margin:0;padding:0;text-align:center">
        <table style="margin:0 auto;"width="400" cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td>
                <p>Olá o <strong> ${email} </strong></p>
                <p>${message}</p>
              </td>
            </tr>
          </tbody>
        </table>
        </div>`;
    }
}

module.exports = TemplateContact;