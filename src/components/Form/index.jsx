import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IoCloseCircleOutline } from "react-icons/io5";

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
  confirmTerm: yup.string().required("Necessário Confirmação"),
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
      <h3>Realize seu Cadastro</h3>
      <form className="form" onSubmit={handleSubmit(onSubmitMyform)}>
        <div className="container_form">
          <div>
            <input placeholder="Nome de usuário*" {...register("user")} />
            <p>
              {errors.user ? <IoCloseCircleOutline></IoCloseCircleOutline> : ""}
              {errors.user?.message}
            </p>
          </div>
          <div>
            <input placeholder="Nome completo*" {...register("name")} />

            <p>
              {errors.name ? <IoCloseCircleOutline></IoCloseCircleOutline> : ""}
              {errors.name?.message}
            </p>
          </div>
          <div>
            <input placeholder="Endereço de Email*" {...register("email")} />

            <p>
              {errors.email ? (
                <IoCloseCircleOutline></IoCloseCircleOutline>
              ) : (
                ""
              )}
              {errors.email?.message}
            </p>
          </div>
          <div>
            <input
              placeholder="Confirme seu Email*"
              {...register("emailConfirm")}
            />
            <p>
              {errors.emailConfirm ? (
                <IoCloseCircleOutline></IoCloseCircleOutline>
              ) : (
                ""
              )}
              {errors.emailConfirm?.message}
            </p>
          </div>
          <div>
            <input placeholder="Senha*" {...register("senha")} />
            <p>
              {errors.senha ? (
                <IoCloseCircleOutline></IoCloseCircleOutline>
              ) : (
                ""
              )}
              {errors.senha?.message}
            </p>
          </div>
          <div>
            <input placeholder="confirme senha" {...register("senhaConfirm")} />

            <p>
              {errors.senhaConfirm ? (
                <IoCloseCircleOutline></IoCloseCircleOutline>
              ) : (
                ""
              )}
              {errors.senhaConfirm?.message}
            </p>
          </div>
          <div></div>
        </div>
        <div className="termUser">
          <input
            type="checkbox"
            value="Concordo com os termos de uso da aplicação"
            {...register("confirmTerm")}
          />
          <p>Concordo com os termos de uso</p>
          <p>{errors.confirmTerm?.message}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
