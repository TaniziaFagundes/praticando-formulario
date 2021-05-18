import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  user: yup.string().required("Nome de usuario é obrigatório"),
  name: yup
    .string()
    .max(18, "Maximo de 18 caracter")
    .required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email é Obrigatório"),
  emailConfirm: yup
    .string()
    .oneOf([yup.ref("email")], "Email não são iguais")
    .required("Confirmação de email é obrigatório"),
  senha: yup
    .string()
    .min(8, "Minímo 8 Digitos")
    .matches(
      /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1})((?=.*[0-9]){1}).*$/,
      "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!"
    )
    .required("Insira Senha"),
  senhaConfirm: yup
    .string()
    .min(8, "Minímo 8 Digitos")
    .required("Insira confirmação de senha"),
  confirmTerm: yup.required("Necessário Confirmação"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitMyform = (data) => console.log("data");

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmitMyform)}>
        <div>
          <input placeholder="Nome de usuário*" {...register("user")} />
          <p>{errors.user?.message}</p>
        </div>
        <div>
          <input placeholder="Nome completo*" {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <input placeholder="Endereço de Email*" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input
            placeholder="Confirme seu Email*"
            {...register("emailConfirm")}
          />
          <p>{errors.emailConfirm?.message}</p>
        </div>
        <div>
          <input placeholder="Senha*" {...register("senha")} />
          <p>{errors.senha?.message}</p>
        </div>
        <div>
          <fieldset>
            <legend>Confirme sua senha</legend>
            <input {...register("senhaConfirm")} />
          </fieldset>
          <p>{errors.senhaConfirm?.message}</p>
        </div>
        <div>
          <input
            type="checkbox"
            value="Concordo com os termos de uso da aplicação"
            {...register("confirmTerm")}
          />
          <p>{errors.confirmTerm?.message}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
