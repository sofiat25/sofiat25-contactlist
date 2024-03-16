const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: [],
			currentAgendaSlug: "sofiagt",
			contactList: "",
			contactSelected: {},
		
		},
		actions: {
			getContacts: async () => {
				try {
					const { currentAgendaSlug } = getStore();
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${currentAgendaSlug}`);
					const data = await response.json();
					setStore({ agenda: data });
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},			
			addContact: async (newContact) => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						body: JSON.stringify(newContact),
						headers: {
							"Content-Type": "application/json"
						}
					});
			
					if (response.ok) {
						const store = getStore();
						// Agregar el nuevo contacto a la agenda en el estado
						setStore({ agenda: [...store.agenda, newContact] });
						console.log("Contact has been added:", newContact);
					} else {
						console.error("Error adding contact:", response.statusText);
					}
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},			
			updateContact: async (id, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "PUT",
						body: JSON.stringify(updatedContact),
						headers: {
							"Content-Type": "application/json"
						}
					});
			
					if (!response.ok) {
						throw new Error(`Failed to update contact: ${response.status} ${response.statusText}`);
					}
			
					const store = getStore();
					const updatedAgenda = store.agenda.map(contact => {
						if (contact.id === id) {
							return { ...contact, ...updatedContact };
						}
						return contact;
					});
					setStore({ agenda: updatedAgenda });
					console.log("Contact has been updated:", updatedContact);
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			},			
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "DELETE"
					});
					const data = await response.json();
					const store = getStore();
					const updatedAgenda = store.agenda.filter((contact) => contact.id !== id);
					setStore({ agenda: updatedAgenda });
					console.log("Contact has been deleted:", data);
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},
		}
	};
};

export default getState;