"use server";

export async function stockForm(formData) {
  const stock = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    fName: formData.get("fName"),
    lName: formData.get("lName"),
  };
}
