<template>
  <div class="auth-wrapper">
    <div class="container">

      <!-- Sign In -->
      <div class="form-container sign-in-container active-panel">
        <form @submit.prevent="iniciarSesion">
          <h2>Iniciar Sesión</h2>

          <input v-model="email" type="email" placeholder="Email" />
          <input v-model="password" type="password" placeholder="Password" />

          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>

      <!-- Panel derecho -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h2>Bienvenido a ListCards Digimon</h2>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async iniciarSesion() {
      console.log("📨 Enviando login con:", this.email, this.password);

      const endpointURL = "https://storedb-api.onrender.com/node-api/users/signin";

      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(endpointURL, payload);
        console.log("✅ Respuesta del servidor:", response.data);

        if (this.$q) {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Inicio de sesión exitoso. ¡Bienvenido!",
          });
        }

        console.log("➡ Redirigiendo a /Digimon...");
        console.log("Router existe? ->", this.$router);
        console.log("Route actual ->", this.$route.fullPath);
        // REDIRECCIÓN FINAL
        this.$router.push("/Digimon");

      } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);

        if (error.response) {
          console.error("Detalles:", error.response.data);
        }

        if (this.$q) {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Error al iniciar sesión. Verifica tus credenciales.",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
/* Wrapper */
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f6f5f7;
}

form h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active-panel {
  left: 0;
  z-index: 2;
}

form {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #2ecc71;
  background-color: #2ecc71;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
}

.overlay {
  background: linear-gradient(to right, #2ecc71, #2ecc71);
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  height: 100%;
  width: 200%;
  transform: translateX(0);
}

.overlay-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  left: 0;
}
</style>
