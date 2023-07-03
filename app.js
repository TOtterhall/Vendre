const app = Vue.createApp({
  data() {
    return {
      page: 1,
      perPage: 6,
      total: null,
      totalPages: null,
      users: [],
      support: null,
    };
  },
  methods: {
    fetchData() {
      fetch(
        `https://reqres.in/api/users?page=${this.page}&per_page=${this.perPage}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.page = data.page;
          this.perPage = data.per_page;
          this.total = data.total;
          this.totalPages = data.total_pages;
          this.users = data.data;
          this.support = data.support;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchData();
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchData();
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});

app.mount("#app");
