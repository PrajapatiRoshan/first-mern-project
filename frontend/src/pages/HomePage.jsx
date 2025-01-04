import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userProductStore } from '../store/product';
import ProductCart from '../components/ProductCart';

const HomePage = () => {
  const { fetchProducts, products } = userProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={'fit-content'} py={12}>
      <VStack wordSpacing={8}>
        <Text
          fontSize={{
            base: '22',
            sm: '28',
          }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400,blue.500)'}
          bgClip={'text'}
          color={'black.500'}
        >
          Current Product
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {!products.length && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No Prduct found{' '}
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
