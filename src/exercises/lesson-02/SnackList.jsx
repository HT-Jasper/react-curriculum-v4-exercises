export default function SnackList() {
  const snacks = [
    { name: 'Cup Cake', rank: 5 },
    { name: 'Chips', rank: 4 },
    { name: 'Swiss Rolls', rank: 3 },
    { name: 'Dark Chocolate', rank: 2 },
    { name: 'Fruit Candy', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>
          {snack.name} {snack.rank}
        </li>
      ))}
    </ol>
  );
}
