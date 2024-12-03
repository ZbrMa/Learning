import { useLazyGetUsersQuery } from "../../../api/userApiSlice";
import Table, { IColumn } from "../../components/table/table";
import { Spinner } from "../../components/spinner/spinner";
import { Button } from "../../components/button/button";
import { IUser } from "../../../types/users";
import { format } from "date-fns";
import { useCheckUserMutation } from "../../../api/userApiSlice";
import { useAlert } from "../../../context/alertContext";
import { useEffect } from "react";
import { Alert } from "../../components/alert/alert";

export function AdminUsersTable() {
  const [refetch,{ data, isLoading, isFetching }] = useLazyGetUsersQuery();
  const [checkUser] = useCheckUserMutation();
  const {showAlert} = useAlert();

  useEffect(()=>{
    refetch();
  },[])
  

  const columns: IColumn<IUser>[] = [
    {
      header: "ID",
      accessor: "id",
      render: (row) => <>{row.id}</>,
    },
    {
      header: "Jméno",
      accessor: "name",
      render: (row) => <>{row.name}</>,
    },
    {
      header: "Příjmení",
      accessor: "surname",
      render: (row) => <>{row.surname}</>,
    },
    {
      header: "Přezdívka",
      accessor: "nick",
      render: (row) => <>{row.nick}</>,
    },
    {
      header: "Narození",
      accessor: "birth",
      render: (row) => <>{format(row.birth,'dd.MM.yyyy')}</>,
    },
    {
      header: "Země",
      accessor: "country",
      render: (row) => <>{row.country}</>,
    },
    {
      header: "Skupina",
      accessor: "band",
      render: (row) => <>{row.band}</>,
    },
    {
      header: "Email",
      accessor: "email",
      render: (row) => <>{row.email}</>,
    },
    {
      header: "Telefon",
      accessor: "phone",
      render: (row) => <>{row.phone}</>,
    },
    {
      header: "Web",
      accessor: "website",
      render: (row) => <>{row.website}</>,
    },
    {
      header: "Instagram",
      accessor: "instagram",
      render: (row) => <>{row.instagram}</>,
    },
    {
      header: "Facebook",
      accessor: "facebook",
      render: (row) => <>{row.facebook}</>,
    },
    {
      header: "Twitter",
      accessor: "twitter",
      render: (row) => <>{row.twitter}</>,
    },
    {
      header: "Potvrzen",
      accessor: "checked",
      render: (row) => <>{row.checked ? "Ano" : <Button
        variant="ternary"
        style={{ fontSize: "0.8rem", padding: "4px 8px" }}
        onClick={()=>hnadleCheckClick(row.id)}
      >
        Potvrdit
      </Button>}</>,
    },
    {
      header: "Umění",
      accessor: "art",
      render: (row) => <>{row.art}</>,
    },
    {
      header: "Role",
      accessor: "role",
      render: (row) => <>{row.role}</>,
    },
  ];
  
  const hnadleCheckClick = async(id:number) => {
    const response = await checkUser({id:id});

    if(response.error) {
      showAlert(<Alert type='negative'>Někde se stala chyba</Alert>)
    } else if (response.data.success){
      showAlert(<Alert type='positive'>{response.data.message}</Alert>)
      refetch();
    } else {
      showAlert(<Alert type='negative'>{response.data.message}</Alert>)
    }

  }

  return isFetching || isLoading ? (
    <Spinner fixed={false} />
  ) : data ? (
    <Table<IUser> columns={columns} data={data} />
  ) : (
    <span>Data nenalezena</span>
  );
}
