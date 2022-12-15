import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@common/store";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import UserModal from "./AddUserModal";
import { DeleteIcon, EditIcon, InfoIcon, QuestionIcon } from "@chakra-ui/icons";
import { UserModel } from "@common/store/users/slice";
import useAuth from "../../hooks/useAuth";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { user } = auth;
  const [modalData, setmodalData] = useState<UserModel>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let apiCalled = false;
  let { data, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!loading && !apiCalled) {
      dispatch({ type: "FETCH_USER" });
      apiCalled = true;
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h2>error</h2>;
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center mt-40">
        <div className="font-extrabold text-30 mb-20">Users</div>
        <TableContainer
          w="80vw"
          className="border rounded-5 p-4"
          display={{ base: "none", md: "block" }}
        >
          <Table variant="striped" colorScheme="pink">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Username</Th>
                <Th>Password</Th>
                <Th>Roles</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((user, index) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{user.user}</Td>
                    <Td>{user.pwd}</Td>
                    <Td>{String(user.roles)}</Td>
                    <Td>
                      <EditIcon
                        mr="20px"
                        color="green.500"
                        className="cursor-pointer w-40 h-40"
                        onClick={() => {
                          setmodalData(user);
                          onOpen();
                        }}
                      />
                      <DeleteIcon
                        color="red.500"
                        onClick={() =>
                          dispatch({
                            type: "DELETE_USER",
                            payload: user.id,
                          })
                        }
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <TableCaption>
              <Button
                colorScheme="messenger"
                onClick={() => {
                  setmodalData(undefined);
                  onOpen();
                }}
              >
                Create User
              </Button>
            </TableCaption>
          </Table>
        </TableContainer>
        <div className="flex flex-col gap-20 md:hidden">
          {data?.map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-20 py-20 first:border-t border-b"
              >
                <div className="flex gap-10">Username : {user.user}</div>
                <div className="flex gap-10">Password : {user.pwd}</div>
                <div>Roles : {String(user.roles)}</div>
                <div>
                  <EditIcon
                    mr="20px"
                    color="green.500"
                    className="cursor-pointer w-40 h-40"
                    onClick={() => {
                      setmodalData(user);
                      onOpen();
                    }}
                  />
                  <DeleteIcon
                    color="red.500"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_USER",
                        payload: user.id,
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
          <Button
            colorScheme="messenger"
            onClick={() => {
              setmodalData(undefined);
              onOpen();
            }}
          >
            Create User
          </Button>
        </div>
        {isOpen && (
          <UserModal isOpen={isOpen} onClose={onClose} data={modalData} />
        )}
        <div className="p-10 mt-30">
          <div className="flex items-center gap-20 w-full justify-start bg-yellow-200 rounded-5 p-10">
            <InfoIcon />
            <div>
              Roles have been assigned to Code Numbers.
              <br />
              2001 - User | 1984 - Doctor | 5150 : Admin
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Users;
