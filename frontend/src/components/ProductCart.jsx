import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';
import { userProductStore } from '../store/product';

const ProductCart = ({ product }) => {
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const bg = useColorModeValue('white', 'gray.1000');
  const { deleteProduct } = userProductStore();
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={'2'}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={'ed'} colorScheme={'blue'} />
          <IconButton
            icon={'del'}
            colorScheme={'red'}
            onClick={async () => {
              const { success, message } = await deleteProduct(product._id);
              console.log(success, message);
            }}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCart;
