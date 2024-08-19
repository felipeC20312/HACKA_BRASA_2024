import { useState } from "react";

interface FromData {
  name: string;
  email: string;
  age: number;
}

const HomePage = () => {

  const [formData, setFormData] = useState<FromData>({
    name: '',
    email: '',
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='age'>Age:</label>
        <input
          type='number'
          id='age'
          name='age'
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default HomePage