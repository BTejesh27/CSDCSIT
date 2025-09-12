// Update student data and optionally upload resume
import type { Student } from "./useStudent";

// Update student data and optionally upload resume
export async function updateStudent(student: Student, resume: File | null) {
  const formData = new FormData();
  formData.append("name", student.name);
  formData.append("mail", student.mail);
  formData.append("phonenumber", student.phonenumber);
  formData.append("registration_number", student.registration_number);
  formData.append("batch", student.batch);
  formData.append("branch", student.branch);
  if (resume) formData.append("resume", resume);
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/students/${student._id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
}
