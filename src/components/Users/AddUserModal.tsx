import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, data }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const tempId = nanoid();
  const [modalData, setModalData] = useState({
    user: "",
    pwd: "",
    id: tempId,
    roles: [2001],
  });
  const ROLES = {
    User: 2001,
    Doctor: 1984,
    Admin: 5150,
  };
  useEffect(() => {
    if (data) {
      setModalData({
        user: data.user,
        pwd: data.pwd,
        id: data.id,
        roles: data.roles,
      });
    }
  }, [data]);
  const setDefault = () => {
    setModalData({ user: "", pwd: "", id: tempId, roles: [2001] });
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          setDefault();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="User name"
                value={modalData?.user}
                onChange={(e) => {
                  setModalData({ ...modalData, user: e.target.value });
                }}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="string"
                value={modalData?.pwd}
                onChange={(e) => {
                  setModalData({ ...modalData, pwd: e.target.value });
                }}
                isRequired
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Roles</FormLabel>
              <div className="flex gap-10">
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  isChecked={modalData?.roles?.includes(ROLES.User)}
                  isReadOnly
                >
                  User
                </Checkbox>
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  isChecked={modalData?.roles?.includes(ROLES.Doctor)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      let modRoles = modalData?.roles;
                      modRoles = [...modRoles, ROLES.Doctor];
                      setModalData({ ...modalData, roles: modRoles });
                    } else {
                      let modRoles = modalData?.roles?.filter(
                        (role) => role !== ROLES.Doctor
                      );
                      setModalData({ ...modalData, roles: modRoles });
                    }
                  }}
                >
                  Doctor
                </Checkbox>
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  isChecked={modalData?.roles?.includes(ROLES.Admin)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      let modRoles = modalData?.roles;
                      modRoles = [...modRoles, ROLES.Admin];
                      setModalData({ ...modalData, roles: modRoles });
                    } else {
                      let modRoles = modalData?.roles?.filter(
                        (role) => role !== ROLES.Admin
                      );
                      setModalData({ ...modalData, roles: modRoles });
                    }
                  }}
                >
                  Admin
                </Checkbox>
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (data) {
                  if (modalData.user.length && modalData.pwd.length) {
                    dispatch({
                      type: "PATCH_USER",
                      payload: modalData,
                    });
                    setDefault();
                    onClose();
                  }
                } else {
                  if (modalData.user.length && modalData.pwd.length) {
                    dispatch({
                      type: "ADD_USER",
                      payload: modalData,
                    });
                    setDefault();
                    onClose();
                  }
                }
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setDefault();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
