import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { buildImageUrl, imageFallback, buildMovieUrl } from '../connectors/tmdb';
import { getYear } from '../utils';
import WatchlistButton from '../components/WatchlistButton';

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const [isHistoryActive, setHistoryActive] = React.useState(false); // temp state, for UI only, should be removed when implemented properly

  const {
    data: movie,
    error,
    isIdle,
    isLoading,
    isError,
  } = useQuery(['movie', movieId], () => fetch(buildMovieUrl(movieId)).then(r => r.json()));

  if (isIdle || isLoading) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (isError) {
    return (
      <Container p={3}>
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton movie={movie} />
          <IconButton
            aria-label={isHistoryActive ? 'Remove from history' : 'Mark as watched'}
            icon={isHistoryActive ? <CheckIcon /> : <AddIcon />}
            colorScheme="teal"
            variant={isHistoryActive ? 'solid' : 'outline'}
            onClick={() => setHistoryActive(a => !a)}
          />
        </HStack>
      </HStack>
      <HStack spacing={3} align="flex-start">
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w="100%">
          <HStack justify="space-between">
            <Heading as="h2">{movie.title}</Heading>
            <Text as="span" color="GrayText">
              {getYear(movie.release_date)}
            </Text>
          </HStack>
          <Text>{movie.overview}</Text>
        </Box>
      </HStack>
    </Container>
  );
}
