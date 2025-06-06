// T-Mobile Brand Colors
export const colors = {
  magenta: "#E20074",
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#E8E8E8",
  darkGray: "#6A6A6A",
  berry: "#861B54",
};

// Healthcare Programs
export const healthcarePrograms = {
  aclTherapy: {
    id: "acl-therapy",
    name: "ACL Therapy Exercise",
    description: "General exercise program for ACL recovery",
    icon: "🏃‍♂️",
    color: "#2196F3",
  },
  aclRehab: {
    id: "acl-rehab",
    name: "ACL Rehabilitation Monitor",
    description: "Real-time knee angle monitoring with AI guidance",
    icon: "🦵",
    color: "#4CAF50",
    isOurProduct: true,
  },
  hypertension: {
    id: "hypertension",
    name: "Hypertension Monitoring",
    description: "Blood pressure tracking and medication alerts",
    icon: "❤️",
    color: "#FF9800",
  },
};

// Mock Users
export const mockUsers = {
  patients: [
    {
      id: 1,
      username: "john_doe",
      password: "patient123",
      name: "John Doe",
      age: 35,
      gender: "male",
      program: "acl-rehab",
    },
    {
      id: 2,
      username: "jane_smith",
      password: "patient456",
      name: "Jane Smith",
      age: 42,
      gender: "female",
      program: "acl-therapy",
    },
    {
      id: 3,
      username: "bob_johnson",
      password: "patient789",
      name: "Bob Johnson",
      age: 55,
      gender: "male",
      program: "hypertension",
    },
  ],
  doctors: [
    { id: 1, username: "dr_smith", password: "doctor123", name: "Dr. Smith" },
    { id: 2, username: "dr_jones", password: "doctor456", name: "Dr. Jones" },
  ],
};
