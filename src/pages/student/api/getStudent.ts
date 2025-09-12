// Fetch student data by phone number and registration number
export async function getStudent(phonenumber: string, registration_number: string) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/students?phonenumber=${phonenumber}&registration_number=${registration_number}`);
  if (!res.ok) throw new Error("Invalid credentials or server error");
  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Student not found");
  return data[0];
}
