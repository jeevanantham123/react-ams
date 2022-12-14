import {
  Button,
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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const tempId = nanoid();
  const [modalData, setModalData] = useState({
    name: "",
    price: "",
    id: tempId,
  });
  useEffect(() => {
    if (data) {
      setModalData({ name: data.name, price: data.price, id: data.id });
    }
  }, [data]);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          setModalData({ name: "", price: "", id: tempId });
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Product name"
                value={modalData?.name}
                onChange={(e) => {
                  setModalData({ ...modalData, name: e.target.value });
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                type="number"
                value={modalData?.price}
                onChange={(e) => {
                  setModalData({ ...modalData, price: e.target.value });
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (data) {
                  dispatch({
                    type: "PATCH_PRODUCT",
                    payload: modalData,
                  });
                } else {
                  console.log(modalData);
                  dispatch({
                    type: "ADD_PRODUCT",
                    payload: modalData,
                  });
                }
                setModalData({ name: "", price: "", id: tempId });
                onClose();
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setModalData({ name: "", price: "", id: tempId });
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

export default ProductModal;
