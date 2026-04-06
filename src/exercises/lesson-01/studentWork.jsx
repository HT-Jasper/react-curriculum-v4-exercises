//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Huy';
  const age = 36;
  const hobbies = ['coding', 'gaming', 'traveling'];

  return (
    <div>
      <h1>About Me</h1>
      <p>
        Hi, I'm {name}. I'm {age} years old and here are some of my hobbies:
      </p>

      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
