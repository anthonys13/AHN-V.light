const app = {
  init: function () {
    app.addListenerToActions();
  },

  addListenerToActions: function () {
    // I want to listen to the submit to change the email and password
    document
      .querySelector("#editmailmodal form")
      .addEventListener("submit", app.handleEditMailForm);
    document
      .querySelector("#editmdpmodal")
      .addEventListener("submit", app.handleEditMdpForm);
    // I want to listen to the submit to change infos of the animal target
  },

  handleEditMailForm: async function (event) {
    // we will remove the page reload
    event.preventDefault();
    // we will create a formData to more easily retrieve the values ​​of the form
    const formData = new FormData(this);
    // console.log('formData = ',formData);
    // console.log("formData.get('email') = ",formData.get('email'));

    const getMyID = document.querySelector("div .getIdEmail");
    // console.log(getMyID.id);

    try {
      const responsePatch = await fetch(
        `${utilsModule.base_url}/edit/email/${Number(getMyID.id)}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      // console.log('responsePatch = ', responsePatch.status);

      if (responsePatch.status === 400) {
        event.target.reset();
        const usedEMAILchange = document.querySelector(".errorEmailchange");
        usedEMAILchange.textContent = "";
        const succedEMAILchange = document.querySelector(".succedEmailchange");
        succedEMAILchange.textContent = "";
        const errorMDPchange = document.querySelector(".errorMDPchange");
        errorMDPchange.textContent = "";
        const succedMDPchange = document.querySelector(".succedMDPchange");
        succedMDPchange.textContent = "";

        const errorEMAILchange = document.querySelector(".errorEmailchange");
        // console.log(span.textContent);
        errorEMAILchange.textContent = "Email incorrect!";
      }

      if (responsePatch.status === 401) {
        event.target.reset();

        const errorEMAILchange = document.querySelector(".errorEmailchange");
        errorEMAILchange.textContent = "";
        const succedEMAILchange = document.querySelector(".succedEmailchange");
        succedEMAILchange.textContent = "";
        const errorMDPchange = document.querySelector(".errorMDPchange");
        errorMDPchange.textContent = "";
        const succedMDPchange = document.querySelector(".succedMDPchange");
        succedMDPchange.textContent = "";

        const usedEMAILchange = document.querySelector(".errorEmailchange");
        // console.log(span.textContent);
        usedEMAILchange.textContent = "Email déjà utilisé!";
      }

      if (responsePatch.ok) {
        event.target.reset();
        const spanAccount = document.querySelector(".email-content");
        // console.log(span.textContent);
        spanAccount.textContent = formData.get("email");

        const usedEMAILchange = document.querySelector(".errorEmailchange");
        usedEMAILchange.textContent = "";
        const errorEMAILchange = document.querySelector(".errorEmailchange");
        errorEMAILchange.textContent = "";
        const errorMDPchange = document.querySelector(".errorMDPchange");
        errorMDPchange.textContent = "";
        const succedMDPchange = document.querySelector(".succedMDPchange");
        succedMDPchange.textContent = "";

        const succedEMAILchange = document.querySelector(".succedEmailchange");
        // console.log(span.textContent);
        succedEMAILchange.textContent = "Email modifié !";
      } else {
        event.target.reset();
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de modifier l'email' !");
    }
  },

  handleEditMdpForm: async function (event) {
    // we will remove the page reload
    event.preventDefault();
    // we will create a formData to more easily retrieve the values ​​of the form
    const formData = new FormData(this);
    // console.log('formData = ',formData);
    // console.log("formData.get('email') = ",formData.get('email'));

    const getMyID = document.querySelector("div .getIdMdp");
    // console.log(getMyID.id);

    try {
      const responsePatch = await fetch(
        `${utilsModule.base_url}/edit/pass/${Number(getMyID.id)}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      // console.log("responsePatch", responsePatch);

      if (responsePatch.status === 400) {
        event.target.reset();
        const errorEMAILchange = document.querySelector(".errorEmailchange");
        errorEMAILchange.textContent = "";
        const succedEMAILchange = document.querySelector(".succedEmailchange");
        succedEMAILchange.textContent = "";
        const succedMDPchange = document.querySelector(".succedMDPchange");
        succedMDPchange.textContent = "";

        const errorMDPchange = document.querySelector(".errorMDPchange");
        // console.log(span.textContent);
        errorMDPchange.textContent = "Mot de passe incorrect!";
      }

      if (responsePatch.ok) {
        event.target.reset();

        const errorEMAILchange = document.querySelector(".errorEmailchange");
        errorEMAILchange.textContent = "";
        const succedEMAILchange = document.querySelector(".succedEmailchange");
        succedEMAILchange.textContent = "";
        const errorMDPchange = document.querySelector(".errorMDPchange");
        errorMDPchange.textContent = "";

        const succedMDPchange = document.querySelector(".succedMDPchange");
        // console.log(span.textContent);
        succedMDPchange.textContent = "Mot de passe modifié !";
      } else {
        event.target.reset();
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de modifier l'email' !");
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
