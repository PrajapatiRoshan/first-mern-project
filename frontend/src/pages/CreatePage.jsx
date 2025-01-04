import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useColorModeValue } from '../components/ui/color-mode';
import { userProductStore } from '../store/product';

import { toaster } from '../components/ui/toaster';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = userProductStore();

  const handlerAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        description: 'product saved successfully',
        type: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toaster.create({
        description: message,
        type: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme={'blue'} onClick={handlerAddProduct} w={'full'}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
