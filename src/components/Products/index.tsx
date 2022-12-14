import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@common/store";
import { fetchProducts, ProductModel } from "@common/store/products/slice";
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
} from "@chakra-ui/react";
import ProductModal from "./AddProductModal";
import { EditIcon } from "@chakra-ui/icons";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const dispatch = useDispatch();
  const [modalData, setmodalData] = useState<ProductModel>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let apiCalled = false;
  let { data, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (!data?.length && !loading && !apiCalled) {
      dispatch(fetchProducts());
      apiCalled = true;
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h2>error</h2>;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-extrabold text-30 mb-20">Products</div>
      <TableContainer w="80vw" className="border rounded-5 p-4">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((product, index) => {
              return (
                <Tr key={product.id}>
                  <Td>{index + 1}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <EditIcon
                      mr="20px"
                      className="cursor-pointer w-40 h-40"
                      onClick={() => {
                        setmodalData(product);
                        onOpen();
                      }}
                    />
                    <Button
                      colorScheme="red"
                      onClick={() =>
                        dispatch({
                          type: "DELETE_PRODUCT",
                          payload: product.id,
                        })
                      }
                    >
                      Delete
                    </Button>
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
              Add new
            </Button>
          </TableCaption>
        </Table>
      </TableContainer>
      <ProductModal isOpen={isOpen} onClose={onClose} data={modalData} />
    </div>
  );
};

export default Products;
