const password = "super-secure-pa$$word";
const hash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
  cost: 4, // number between 4-31
});
console.log(hash);

const isMatch = await Bun.password.verify(password, hash);

console.log(isMatch);