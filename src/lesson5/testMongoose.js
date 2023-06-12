const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
// установка схемы
const userScheme = new Schema({
    name: String,
    age: Number
});
  

async function main() {
    // console.log(await User.find());
    // подключение
    await mongoose.connect("mongodb+srv://givmiller:<password>@cluster0.vzazela.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true });
    
    const User = mongoose.model("User", userScheme);
    const user = new User({
        name: "Bill",
        age: 41
    });

    console.log(`В коллекции users ${await User.countDocuments()} документов`);

    await user.save();
    console.log("Сохранен объект", user);
    // console.log(await User.find());
    console.log(`В коллекции users ${await User.countDocuments()} документов`);

    mongoose.disconnect();  // отключение от базы данных
}

main().then().catch((err) => console.error(err));
