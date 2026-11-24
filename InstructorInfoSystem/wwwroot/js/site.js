
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector("[data-popup-message]");

    if (popup) {
        alert(popup.dataset.popupMessage);
    }

    document.querySelectorAll("form").forEach(function (form) {
        form.addEventListener("submit", function (event) {
            const password = form.querySelector("#Password");
            const confirmPassword = form.querySelector("#ConfirmPassword");

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                event.preventDefault();
                alert("Password and Confirm Password do not match.");
            }
        });
    });

    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("passwordField");

    if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", function () {
            const isPassword = passwordField.type === "password";
            passwordField.type = isPassword ? "text" : "password";
            togglePassword.textContent = isPassword ? "Hide password" : "Show password";
        });
    }
});


// Navigation collapse and animated light/dark appearance controls.
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const sidebarToggle = document.getElementById("sidebarToggle");
    const themeToggle = document.getElementById("themeToggle");

    // Apply saved preferences before interaction.
    if (localStorage.getItem("iis-theme") === "dark") body.classList.add("dark-mode");
    if (localStorage.getItem("iis-sidebar") === "collapsed") body.classList.add("sidebar-collapsed");

    function updateThemeButton(animate) {
        if (!themeToggle) return;
        const dark = body.classList.contains("dark-mode");
        const icon = themeToggle.querySelector(".theme-icon");
        const label = themeToggle.querySelector(".theme-label");
        if (icon) {
            icon.className = "theme-icon bi " + (dark ? "bi-sun-fill" : "bi-moon-stars-fill");
            if (animate) {
                icon.classList.remove("theme-icon-enter");
                void icon.offsetWidth;
                icon.classList.add("theme-icon-enter");
            }
        }
        if (label) label.textContent = dark ? "Light mode" : "Dark mode";
        themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
        themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
    updateThemeButton(false);

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.add("theme-transitioning");
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            localStorage.setItem("iis-theme", isDark ? "dark" : "light");
            updateThemeButton(true);
            window.setTimeout(function () {
                body.classList.remove("theme-transitioning");
            }, 650);
        });
    }

    if (sidebarToggle) {
        function updateSidebarButton() {
            const collapsed = body.classList.contains("sidebar-collapsed");
            sidebarToggle.setAttribute("aria-label", collapsed ? "Expand navigation" : "Collapse navigation");
            sidebarToggle.setAttribute("title", collapsed ? "Expand navigation" : "Collapse navigation");
            sidebarToggle.innerHTML = collapsed
                ? '<i class="bi bi-layout-sidebar"></i>'
                : '<i class="bi bi-layout-sidebar-inset"></i>';
        }
        updateSidebarButton();
        sidebarToggle.addEventListener("click", function () {
            body.classList.toggle("sidebar-collapsed");
            localStorage.setItem("iis-sidebar", body.classList.contains("sidebar-collapsed") ? "collapsed" : "expanded");
            updateSidebarButton();
        });
    }
});
