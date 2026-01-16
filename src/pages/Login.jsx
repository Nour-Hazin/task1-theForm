import {
    Container,
    Stack,
    Button,
    Heading,
    VStack,
    Center,
    Input,
    Box,
    Text
} from '@chakra-ui/react';
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../app/features/loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, error, data } = useSelector((state) => state.login);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [isEmail, setisEmail] = useState(false);
    const [isPassword, setisPassword] = useState(false);

    useEffect(() => {
        if (data) {
            navigate('/'); 
        }
    }, [data, navigate]);

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        setisEmail(false);
        setisPassword(false);

        const emailError = !user.email;
        const passwordError = !user.password;

        if (emailError || passwordError) {
            setisEmail(emailError);
            setisPassword(passwordError);
            return;
        }

        dispatch(userLogin(user));
    };

    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack gap="4">
                    <Stack align="center">
                        <Heading size="2xl">Sign in to your account</Heading>
                    </Stack>

                    <VStack
                        as="form"
                        width={{ base: 'xs', sm: 'sm', md: 'md' }}
                        bg="white"
                        _dark={{ bg: "gray.700" }}
                        rounded="lg"
                        shadow="lg"
                        p={{ base: 5, sm: 10 }}
                        gap="8"
                        onSubmit={submitHandler}
                    >
                        <VStack gap="4" w="100%">
                            {error && (
                                <Box bg="red.100" p={2} rounded="md" w="100%" textAlign="center">
                                    <Text color="red.600" fontSize="sm">{error}</Text>
                                </Box>
                            )}

                            <Field 
                                label="Email" 
                                id="email" 
                                invalid={isEmail} 
                                errorText="Email is required to login."
                            >
                                <Input 
                                    variant="outline" 
                                    name='email' 
                                    type="email"
                                    value={user.email} 
                                    onChange={onChangeHandler}
                                    disabled={loading} 
                                />
                            </Field>

                            <Field 
                                label="Password" 
                                id="password" 
                                invalid={isPassword} 
                                errorText="Password is required to login."
                            >
                                <PasswordInput 
                                    placeholder="Enter your password" 
                                    name='password'
                                    value={user.password} 
                                    onChange={onChangeHandler}
                                    disabled={loading}
                                />
                            </Field>
                        </VStack>

                        <VStack w="100%">
                            <Stack direction="row" justify="space-between" w="100%">
                                <Checkbox colorPalette="green">
                                    Remember me
                                </Checkbox>
                                <Link to="/forgot-password" style={{ fontSize: '14px', textDecoration: 'underline' }}>
                                    Forgot password?
                                </Link>
                            </Stack>

                            <Button
                                colorPalette="green"
                                variant="solid"
                                rounded="md"
                                w="100%"
                                mt="4"
                                type='submit'
                                loading={loading} 
                                loadingText="Logging in..."
                            >
                                Sign in
                            </Button>
                        </VStack>
                    </VStack>
                </Stack>
            </Center>
        </Container>
    );
};

export default Login;