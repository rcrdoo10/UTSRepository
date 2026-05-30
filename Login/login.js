const validUsers = [
  {
    username: "rayricardo",
    password: "user123",
    name: "Ray Ricardo",
    role: "user",
  },
  { username: "admin", password: "admin123", name: "Admin", role: "admin" },
];

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

function showAlert(message, type = "error") {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerHTML = `<i class="fas ${type === "error" ? "fa-exclamation-circle" : "fa-check-circle"}"></i> ${message}`;
  alertBox.className = `alert alert-${type}`;
  alertBox.style.display = "flex";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showAlert("❌ Username dan password harus diisi!", "error");
    return;
  }

  const user = validUsers.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userUsername", user.username);
    localStorage.setItem("userRole", user.role);

    showAlert(`✅ Selamat datang, ${user.name}! Mengalihkan...`, "success");

    setTimeout(() => {
      if (user.role === "admin") {
        window.location.href = "dashboard/dashboard.html";
      } else {
        window.location.href = "dashboard-user/dashboard.html";
      }
    }, 1500);
  } else {
    const userExists = validUsers.some((u) => u.username === username);
    if (userExists) {
      showAlert("❌ Password salah!", "error");
    } else {
      showAlert("❌ Username tidak ditemukan!", "error");
    }
  }
});

if (localStorage.getItem("isLoggedIn") === "true") {
  const role = localStorage.getItem("userRole");
  if (role === "admin") {
    window.location.href = "dashboard/dashboard.html";
  } else {
    window.location.href = "dashboard-user/dashboard.html";
  }
}

document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
  }
});
