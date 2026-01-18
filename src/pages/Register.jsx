import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    Grid, GridItem, VStack, Heading, Input, Textarea, 
    Button, Box, Text, Image, HStack, Stack 
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { registerUser } from "../app/features/registerSlice"; // تأكد من المسار

const Register = () => {
    const dispatch = useDispatch();
    const { loading, data: savedData } = useSelector(state => state.register || {});

    const [user, setUser] = useState({
        name: "", bio: "", gender: "male", country: "Syria", 
        agree: false, image: null, video: null
    });

    useEffect(() => {
        if (savedData) {
            setUser(prev => ({ ...prev, ...savedData, image: null, video: null }));
        }
    }, [savedData]);

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({ ...user, [name]: type === "checkbox" ? checked : value });
    };

    const onFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            setUser({ ...user, [name]: URL.createObjectURL(files[0]) }); 
        }
    };

    return (
        <Grid templateColumns={{ base: "1fr", md: "1.2fr 0.8fr" }} gap={8} p={10}>
            <GridItem p={6} bg="white" shadow="md" rounded="lg" _dark={{bg: "gray.800"}}>
                <VStack as="form" gap={5} onSubmit={(e) => { e.preventDefault(); dispatch(registerUser(user)); }}>
                    <Heading size="lg">Task 1: Advanced Form</Heading>
                    
                    <Field label="Full Name">
                        <Input name="name" value={user.name} onChange={onChangeHandler} />
                    </Field>
                    
                    <Field label="Bio">
                        <Textarea name="bio" value={user.bio} onChange={onChangeHandler} />
                    </Field>

                    <Field label="Country">
                        <NativeSelectRoot>
                            <NativeSelectField name="country" value={user.country} onChange={onChangeHandler}>
                                <option value="Syria">Syria</option>
                                <option value="USA">USA</option>
                                <option value="UAE">UAE</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </Field>

                    <Field label="Gender">
                        <RadioGroup value={user.gender} onValueChange={(d) => setUser({...user, gender: d.value})}>
                            <HStack gap="6">
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </HStack>
                        </RadioGroup>
                    </Field>

                    <Field label="Profile Image">
                        <Input type="file" name="image" accept="image/*" onChange={onFileChange} />
                    </Field>
                    <Field label="Profile Video">
    <Input type="file" name="video" accept="video/*" onChange={onFileChange} />
</Field>
                    <Checkbox checked={user.agree} onCheckedChange={(e) => setUser({...user, agree: !!e.checked})}>
                        I agree to the terms
                    </Checkbox>

                    <Button loading={loading} type="submit" colorPalette="blue" w="100%">
                        Submit & Store Data
                    </Button>
                </VStack>
            </GridItem>

            <GridItem p={6} bg="gray.50" rounded="lg" border="1px solid" borderColor="gray.200" _dark={{bg: "gray.900"}}>
                <Heading size="md" mb={4} color="blue.600">Live Preview Panel</Heading>
                <VStack align="start" gap={4}>
                    <Text><b>Name:</b> {user.name || "---"}</Text>
                    <Text><b>Bio:</b> {user.bio || "---"}</Text>
                    <Text><b>Country:</b> {user.country}</Text>
                    <Text><b>Gender:</b> {user.gender}</Text>
                    {user.image && <Image src={user.image} w="150px" rounded="md" />}
                    {user.video && <video src={user.video} controls width="200" />}
                </VStack>
            </GridItem>
        </Grid>
    );
};

export default Register;