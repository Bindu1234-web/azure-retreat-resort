
/* =========================================================
   01. NAVBAR SCROLL EFFECT
   ========================================================= */

const mainNav = document.getElementById("mainNav");

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();


/* =========================================================
   02. MOBILE NAVBAR
   ========================================================= */

const navbarCollapse = document.getElementById("navbarContent");
const navLinks = document.querySelectorAll(".navbar .nav-link");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (
      window.innerWidth < 992 &&
      navbarCollapse.classList.contains("show")
    ) {

      const bsCollapse =
        bootstrap.Collapse.getInstance(navbarCollapse);

      if (bsCollapse) {
        bsCollapse.hide();
      }

    }

  });

});


/* =========================================================
   03. ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

  const scrollPosition =
    window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink =
        document.querySelector(
          `.navbar .nav-link[href="#${sectionId}"]`
        );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    }

  });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================================================
   04. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   05. GALLERY LIGHTBOX
   ========================================================= */

const galleryItems =
  document.querySelectorAll(".gallery-item");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.querySelector(".lightbox-close");


galleryItems.forEach((item) => {

  item.addEventListener("click", () => {

    const image =
      item.getAttribute("data-image");

    if (!image) {
      return;
    }

    lightboxImage.src = image;

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  });

});


function closeLightbox() {

  lightbox.classList.remove("open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightboxImage.src = "";

  document.body.style.overflow = "";

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


/* Close lightbox with Escape key */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("open")
    ) {

      closeLightbox();

    }

  }
);


/* =========================================================
   06. DATE VALIDATION
   ========================================================= */

const checkin =
  document.getElementById("checkin");

const checkout =
  document.getElementById("checkout");


function getTodayDate() {

  const today = new Date();

  const year = today.getFullYear();

  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(today.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;

}


const todayDate = getTodayDate();


if (checkin) {
  checkin.min = todayDate;
}

if (checkout) {
  checkout.min = todayDate;
}


/* Check-out should be after check-in */

if (checkin && checkout) {

  checkin.addEventListener(
    "change",
    () => {

      if (checkin.value) {

        checkout.min =
          checkin.value;

        if (
          checkout.value &&
          checkout.value <= checkin.value
        ) {

          checkout.value = "";

        }

      }

    }
  );

}


/* =========================================================
   07. ENQUIRY FORM
   ========================================================= */

const enquiryForm =
  document.getElementById("enquiryForm");

const successToast =
  document.getElementById("successToast");

const toastClose =
  document.getElementById("toastClose");


function showError(field, message) {

  const error =
    field.parentElement.querySelector(
      ".error-message"
    );

  if (error) {
    error.textContent = message;
  }

  field.classList.add("input-error");

}


function clearError(field) {

  const error =
    field.parentElement.querySelector(
      ".error-message"
    );

  if (error) {
    error.textContent = "";
  }

  field.classList.remove("input-error");

}


function showSuccessToast() {

  successToast.classList.add("show");

}


function hideSuccessToast() {

  successToast.classList.remove("show");

}


if (toastClose) {

  toastClose.addEventListener(
    "click",
    hideSuccessToast
  );

}


if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document.getElementById("name");

      const email =
        document.getElementById("email");

      const phone =
        document.getElementById("phone");

      const guests =
        document.getElementById("guests");

      const checkinField =
        document.getElementById("checkin");

      const checkoutField =
        document.getElementById("checkout");


      let isValid = true;


      /* Clear previous errors */

      [
        name,
        email,
        phone,
        guests,
        checkinField,
        checkoutField
      ].forEach((field) => {

        if (field) {
          clearError(field);
        }

      });


      /* Name */

      if (
        !name.value.trim() ||
        name.value.trim().length < 2
      ) {

        showError(
          name,
          "Please enter your name."
        );

        isValid = false;

      }


      /* Email */

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !email.value.trim() ||
        !emailPattern.test(
          email.value.trim()
        )
      ) {

        showError(
          email,
          "Please enter a valid email."
        );

        isValid = false;

      }


      /* Phone */

      const phoneDigits =
        phone.value.replace(/\D/g, "");

      if (
        phoneDigits.length < 10
      ) {

        showError(
          phone,
          "Please enter a valid phone number."
        );

        isValid = false;

      }


      /* Guests */

      if (!guests.value) {

        showError(
          guests,
          "Please select the number of guests."
        );

        isValid = false;

      }


      /* Check-in */

      if (!checkinField.value) {

        showError(
          checkinField,
          "Please select a check-in date."
        );

        isValid = false;

      }


      /* Check-out */

      if (!checkoutField.value) {

        showError(
          checkoutField,
          "Please select a check-out date."
        );

        isValid = false;

      }


      /* Date comparison */

      if (
        checkinField.value &&
        checkoutField.value &&
        checkoutField.value <= checkinField.value
      ) {

        showError(
          checkoutField,
          "Check-out must be after check-in."
        );

        isValid = false;

      }


      /* Stop if invalid */

      if (!isValid) {
        return;
      }


      /* Successful submission */

      showSuccessToast();

      enquiryForm.reset();

      checkoutField.min = todayDate;


      /* Automatically hide after 5 seconds */

      setTimeout(() => {

        hideSuccessToast();

      }, 5000);

    }
  );

}


/* =========================================================
   08. REMOVE FORM ERRORS WHILE TYPING
   ========================================================= */

const formFields =
  document.querySelectorAll(
    "#enquiryForm input, #enquiryForm select, #enquiryForm textarea"
  );


formFields.forEach((field) => {

  field.addEventListener(
    "input",
    () => {
      clearError(field);
    }
  );

  field.addEventListener(
    "change",
    () => {
      clearError(field);
    }
  );

});


/* =========================================================
   09. NEWSLETTER FORM
   ========================================================= */

const newsletterForm =
  document.getElementById("newsletterForm");

const newsletterEmail =
  document.getElementById("newsletterEmail");


if (newsletterForm) {

  newsletterForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const email =
        newsletterEmail.value.trim();


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailPattern.test(email)) {

        newsletterEmail.focus();

        newsletterEmail.setCustomValidity(
          "Please enter a valid email address."
        );

        newsletterEmail.reportValidity();

        newsletterEmail.setCustomValidity("");

        return;

      }


      newsletterEmail.value = "";


      showSuccessToast();


      const toastTitle =
        successToast.querySelector("strong");

      const toastMessage =
        successToast.querySelector("p");


      if (toastTitle) {
        toastTitle.textContent =
          "You're on the list";
      }

      if (toastMessage) {
        toastMessage.textContent =
          "Thank you for joining Azure Retreat.";
      }


      setTimeout(() => {

        if (toastTitle) {
          toastTitle.textContent =
            "Enquiry received";
        }

        if (toastMessage) {
          toastMessage.textContent =
            "Thank you. We'll be in touch shortly.";
        }

        hideSuccessToast();

      }, 5000);

    }
  );

}


/* =========================================================
   10. CURRENT YEAR
   ========================================================= */

const currentYear =
  document.getElementById("currentYear");


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   11. SMOOTH SCROLL
   ========================================================= */

const internalLinks =
  document.querySelectorAll(
    'a[href^="#"]'
  );


internalLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      const navbarHeight =
        mainNav
          ? mainNav.offsetHeight
          : 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   12. HERO IMAGE LOADING
   ========================================================= */

const heroImage =
  document.querySelector(".hero-image");


if (heroImage) {

  const image =
    new Image();

  image.src =
    "images/hero.jpg";

}


/* =========================================================
   13. PREVENT BODY SCROLL WHEN LIGHTBOX IS OPEN
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth >= 992 &&
      navbarCollapse &&
      navbarCollapse.classList.contains("show")
    ) {

      const bsCollapse =
        bootstrap.Collapse.getInstance(
          navbarCollapse
        );

      if (bsCollapse) {
        bsCollapse.hide();
      }

    }

  }
);


/* =========================================================
   14. PAGE LOAD
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

    handleNavbarScroll();
    updateActiveNav();

  }
);