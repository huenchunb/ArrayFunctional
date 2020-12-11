const clients = [
  { id: 1, taxNumber: "86620855", name: "HECTOR ACUÑA BOLAÑOS" },
  { id: 2, taxNumber: "7317855K", name: "JESUS RODRIGUEZ ALVAREZ" },
  { id: 3, taxNumber: "73826497", name: "ANDRES NADAL MOLINA" },
  { id: 4, taxNumber: "88587715", name: "SALVADOR ARNEDO MANRIQUEZ" },
  { id: 5, taxNumber: "94020190", name: "VICTOR MANUEL ROJAS LUCAS" },
  { id: 6, taxNumber: "99804238", name: "MOHAMED FERRE SAMPER" }
];
const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 }
];
const banks = [
  { id: 1, name: "SANTANDER" },
  { id: 2, name: "CHILE" },
  { id: 3, name: "ESTADO" }
];

// In: empty, Out: Array con los nombres de los clientes
// Problema planteado:
// Crear una función que devuelva un array con los nombres de cliente
// Ordenados de mayor a menor por la suma TOTAL de los saldos
// De cada cliente

const getOrderedNames = () => {
  const clientsMap = clients.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  const grouppedAccounts = accounts.reduce((acc, { clientId, balance }) => {
    acc[clientId] = (acc[clientId] || 0) + balance;

    return acc;
  }, {});

  const orderedNames = Object.keys(grouppedAccounts)
    .sort(
      (currId, nextId) => grouppedAccounts[nextId] - grouppedAccounts[currId]
    )
    .map((id) => clientsMap[id]);

  console.log(orderedNames);
};

const getOrderedNamesFunctional = () =>
  Object.entries(
    accounts
      .map((curr) => ({
        ...curr,
        // Este clients.find convierte el algoritmo en complejidad O(n^2)
        // Se ahorra con el clientsMap de la solucion anterior
        name: clients.find(({ id }) => curr.clientId === id).name
      }))
      .reduce((acc, { name, balance }) => {
        acc[name] = (acc[name] || 0) + balance;

        return acc;
      }, {})
  )
    .sort(([, currTotal], [, nextTotal]) => nextTotal - currTotal)
    .map(([name]) => name);

console.log(getOrderedNames());
console.log(getOrderedNamesFunctional());
