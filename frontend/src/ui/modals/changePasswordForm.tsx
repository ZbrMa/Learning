import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../api/userApiSlice";
import { IFieldConfig, IFormConfig } from "../../types/form";
import { Form } from "../components/form/form";
import { RootState } from "../../store/reduxStore";
import { Modal } from "../components/modal/modal";
import { Spinner } from "../components/spinner/spinner";
import { useAlert } from "../../context/alertContext";
import { Alert } from "../components/alert/alert";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const changePassFields: IFieldConfig[] = [
  {
    name: "oldPass",
    label: "Staré heslo",
    type: "password",
    validation: {
      required: true,
    },
  },
  {
    name: "newPass",
    label: "Nové heslo",
    type: "password",
    validation: {
      required: true,
    },
  },
  {
    name: "newPassRepeat",
    label: "Nové heslo znovu",
    type: "password",
    validation: {
      required: true,
    },
  },
];

export function ChnagePasswordForm() {
  const [sendPass, { isLoading }] = useChangePasswordMutation();
  const userId = useSelector((root: RootState) => root.auth.id);
  const { t } = useTranslation("common");

  const { showAlert } = useAlert();
  const { setModal } = useContext(ModalContext);

  const changePassFormConfig: IFormConfig = {
    fields: changePassFields,
    onSubmit: async (data) => {
      const response = await sendPass({
        id: userId,
        old: data["oldPass"],
        new: data["newPass"],
      });

      if (response.error) {
        showAlert(
          <Alert type="negative" title={t("errors.title.server")}>
            {t("errors.server")}
          </Alert>
        );
      } else if (response.data.success) {
        showAlert(
          <Alert type="positive" title={t("success.header")}>
            {t("success.passChange")}
          </Alert>,
          3000
        );
        setModal(null);
      } else {
        showAlert(
          <Alert type="negative" title={t("errors.title.pass")}>
            {t("errors.pass")}
          </Alert>,
          3000
        );
      }
    },
  };

  return (
    <Modal id="editPassModal" title="Změna hesla">
      {isLoading && <Spinner />}
      <Form
        config={changePassFormConfig}
        btnText="Změnit heslo"
        checkList
        checkField="newPass"
      />
    </Modal>
  );
}
