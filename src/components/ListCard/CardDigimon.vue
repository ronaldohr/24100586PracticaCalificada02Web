<template>
  <div class="digimon-container">
    <div class="filters">
  <div class="filter-left">
    <input
      v-model="searchName"
      type="text"
      placeholder="Buscar por nombre..."
      class="input"
    />

    <select v-model="selectedLevel" class="input">
        <option value="">Todos los niveles</option>
        <option v-for="nivel in levels" :key="nivel" :value="nivel">
            {{ nivel }}
        </option>
        </select>
    </div>

    <img 
        class="logo-digimon"
        src="~assets/img/DigimonLogo.png"
        alt="Digimon Logo"
    />
    </div>

    <div class="card-grid">
      <div v-for="d in filteredDigimons" :key="d.name" class="card">
        <div class="img-wrapper">
          <img
            :src="d.img"
            loading="lazy"
            @load="d.isLoading = false"
            @error="d.img = fallbackImg"
            :class="{ hidden: d.isLoading }"
          />

          <div v-if="d.isLoading" class="skeleton"></div>
        </div>

        <h3 class="name">{{ d.name }}</h3>
        <p class="level">{{ d.level }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      digimons: [],
      searchName: "",
      selectedLevel: "",
      levels: [],
      fallbackImg: "https://via.placeholder.com/150?text=No+Image",
    }
  },

  computed: {
    filteredDigimons() {
      return this.digimons.filter(d => {
        const matchName = d.name.toLowerCase().includes(this.searchName.toLowerCase())
        const matchLevel = this.selectedLevel ? d.level === this.selectedLevel : true
        return matchName && matchLevel
      })
    },
  },

  async mounted() {
    const res = await fetch("https://digimon-api.vercel.app/api/digimon")
    const data = await res.json()

    // Agregamos flag de loading por cada Digimon
    this.digimons = data.map(d => ({
      ...d,
      isLoading: true
    }))

    // Niveles únicos
    this.levels = [...new Set(data.map(d => d.level))]
  }
}
</script>

<style scoped>

.digimon-container {
  max-width: 1250px;
  margin: auto;
  padding: 20px;
}

.filters {
  display: flex;
  justify-content: space-between; /* filtros izquierda y logo derecha */
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.filter-left {
  display: flex;
  gap: 15px;
  align-items: center;
}

.logo-digimon {
  width: 150px;
  height: auto;
  object-fit: contain;
}


.input {
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 200px;
}

/* GRID */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 18px;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: center;
}

/* IMAGE WRAPPER */
.img-wrapper {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

img.hidden {
  display: none;
}

/* SKELETON LOADER */
.skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ececec 25%, #f7f7f7 50%, #ececec 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

/* TEXT */
.name {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  word-break: break-word; /* IMPIDE QUE SE SALGA DEL CARD */
}

.level {
  font-size: 14px;
  color: #555;
}
</style>
