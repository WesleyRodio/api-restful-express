// Limite mais restrito para login (evitar brute force)
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5, // apenas 5 tentativas
//   message: {
//     success: false,
//     message: "Muitas tentativas de login. Aguarde 15 minutos.",
//   },
// });

// app.use(globalLimiter);
// app.use("/auth/login", authLimiter);
