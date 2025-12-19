'use server'


export async function createUser(prevState, formData) {
    const name = formData.get("userName")
    return console.log("the name is", name)
} 