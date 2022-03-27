// @ts-ignore
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js";

new Vue({
  el: "#app",
  data() {
    return {
      form: {
        name: "",
        value: "",
      },
      contacts: [],
    };
  },
  computed: {
    canCreate() {
      return this.form.name.trim() && this.form.value.trim();
    },
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;
      const newContact = await request("/api/contacts", "POST", contact);
      this.contacts.push(newContact);
      this.form.name = this.form.value = "";
    },
    async markContact(id, marked) {
      const contact = this.contacts.find((c) => c.id === id);
      const updated = await request(`/api/contacts/${id}`, "PUT", {
        ...contact,
        marked: `${!marked}`,
      });
      contact.marked = updated.marked;
    },
    async removeContact(id) {
      await request(`/api/contacts/${id}`, "DELETE");
      this.contacts = this.contacts.filter((c) => c.id !== id);
    },
  },
  async mounted() {
    this.contacts = await request("/api/contacts");
  },
});

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    // @ts-ignore
    const respons = await fetch(url, { method, headers, body });
    return await respons.json();
  } catch (e) {
    console.warn("Error:", e.message);
  }
}
