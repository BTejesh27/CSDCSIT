import { useState } from "react";
import { getStudent } from "./api/getStudent";
import { updateStudent } from "./api/updateStudent";
import { useSnackbar } from "notistack";
import { useTheme, alpha, Container, Box } from "@mui/material";
import StudentLoginDialog from "./StudentLoginDialog";
import StudentEditDialog from "./StudentEditDialog";
import StudentDetails from "./StudentDetails";

// Define Student type at the top
interface Student {
  _id: string;
  name: string;
  mail: string;
  phonenumber: string;
  registration_number: string;
  batch: string;
  branch: string;
  resumeName?: string;
  resumePath?: string;
}

const StudentPage = () => {
  const theme = useTheme();
  const [loginOpen, setLoginOpen] = useState(true);
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Omit<Student, "_id" | "resumeName" | "resumePath"> & { resume: File | null }>({
    name: "",
    mail: "",
    phonenumber: "",
    registration_number: "",
    batch: "",
    branch: "",
    resume: null,
  });
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Login handler
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const studentData = await getStudent(phonenumber, password);
      setStudent(studentData);
      setLoginOpen(false);
      enqueueSnackbar("Login successful!", { variant: "success" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Edit handler
  const handleEdit = () => {
    if (!student) return;
    setEditData({
      name: student.name || "",
      mail: student.mail || "",
      phonenumber: student.phonenumber || "",
      registration_number: student.registration_number || "",
      batch: student.batch || "",
      branch: student.branch || "",
      resume: null,
    });
    setEditOpen(true);
  };

  // Validation helper
  const validateEditData = () => {
    if (!editData.name.trim()) return "Name is required";
    if (!editData.mail.trim()) return "Mail is required";
    // Email validation
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(editData.mail)) return "Enter a valid email address";
    if (!editData.phonenumber.trim()) return "Phone number is required";
    // Phone number validation: only digits, length 10
    if (!/^\d{10}$/.test(editData.phonenumber)) return "Phone number must be 10 digits";
    if (!editData.registration_number.trim()) return "Registration number is required";
    if (!editData.batch.trim()) return "Batch is required";
    if (!editData.branch.trim()) return "Branch is required";
    return "";
  };

  // Save edit
  const handleSaveEdit = async () => {
    const validationError = validateEditData();
    if (validationError) {
      setError(validationError);
      enqueueSnackbar(validationError, { variant: "error" });
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (!student) throw new Error("No student selected");
      const updatedStudentObj = {
        _id: student._id,
        name: editData.name,
        mail: editData.mail,
        phonenumber: editData.phonenumber,
        registration_number: editData.registration_number,
        batch: editData.batch,
        branch: editData.branch,
      };
      await updateStudent(updatedStudentObj, editData.resume);
      // Refetch student data after update
      const refreshedStudent = await getStudent(editData.phonenumber, editData.registration_number);
      setStudent(refreshedStudent);
      enqueueSnackbar("Student updated successfully", { variant: "success" });
      setEditOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`, py: 4 }}>
        <StudentLoginDialog
          open={loginOpen}
          phonenumber={phonenumber}
          password={password}
          loading={loading}
          error={error}
          setPhonenumber={setPhonenumber}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
        {student && (
          <StudentDetails
            student={student}
            onEdit={handleEdit}
            resumeDialogOpen={resumeDialogOpen}
            setResumeDialogOpen={setResumeDialogOpen}
            theme={theme}
          />
        )}
        <StudentEditDialog
          open={editOpen}
          editData={editData}
          setEditData={setEditData}
          error={error}
          loading={loading}
          onSave={handleSaveEdit}
          onClose={() => setEditOpen(false)}
        />
      </Box>
    </Container>
  );
};

export default StudentPage;