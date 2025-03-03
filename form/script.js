document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");

  const susscesMessage = document.getElementById("susscesMessage");

  const godinaRodjenja = document.getElementById("godinaRodjenja");

  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 18; year >= currentYear - 100; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    godinaRodjenja.appendChild(option);
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    function validateField(id) {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      }
    }

    ["ime", "prezime", "godinaRodjenja", "adresa", "grad"].forEach(
      validateField
    );

    const saglasnost = document.getElementById("saglasnost");
    if (!saglasnost.checked) {
      saglasnost.classList.add("is-invalid");
      saglasnost.classList.remove("is-valid");
      isValid = false;
    } else {
      saglasnost.classList.remove("is-invalid");
      saglasnost.classList.add("is-valid");
    }

    if (!isValid) return;

    const formData = {
      ime: document.getElementById("ime").value,
      prezime: document.getElementById("prezime").value,
      pol: document.getElementById("pol").value,
      godinaRodjenja: document.getElementById("godinaRodjenja").value,
      adresa: document.getElementById("adresa").value,
      grad: document.getElementById("grad").value,
      saglasnost: document.getElementById("saglasnost").checked ? "DA" : "NE"
    };

    fetch("http://localhost/form_back/server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())

      .then(() => {
        form.remove();
        susscesMessage.classList.remove("d-none");
        susscesMessage.style.display = "block";
        susscesMessage.innerHTML = `
         <div class="alert alert-success">
           <strong>Uspešno ste popunili formu. Ispod su vaši uneti podaci:</strong><br>
            <ul>
             <li><strong>Ime:</strong> ${formData.ime}</li>
             <li><strong>Prezime:</strong> ${formData.prezime}</li>
             <li><strong>Pol:</strong> ${formData.pol}</li>
             <li><strong>Godina rođenja:</strong> ${formData.godinaRodjenja}</li>
             <li><strong>Adresa:</strong> ${formData.adresa}</li>
             <li><strong>Grad:</strong> ${formData.grad}</li>
             <li><strong>Saglasnost:</strong> ${formData.saglasnost}</li>
           </ul>
         </div>
       `;
      })

      .catch((error) => console.error("Greška:", error));
  });
});
