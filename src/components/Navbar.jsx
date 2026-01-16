import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Stack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { RiFlashlightFill } from "react-icons/ri";

import { Link, NavLink as RouterNavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const dropdownLinks = [
  { name: "Blog", path: "#" },
  { name: "Documentation", path: "#" },
  { name: "Github Repo", path: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box 
      px={4} 
      bg={{ base: "white", _dark: "gray.900" }} 
      borderBottomWidth="1px" 
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto" maxW="1200px">
        
        {/* الشعار - عند الضغط عليه يعود للرئيسية */}
        <HStack as={RouterNavLink} to="/" gap={2} cursor="pointer" _hover={{ textDecoration: "none" }}>
           <Icon as={RiFlashlightFill} h={8} w={8} color="blue.500" />
           <Text fontWeight="bold" fontSize="xl">Brand</Text>
        </HStack>

        {/* روابط الديسكتوب */}
        <HStack gap={8} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <CustomNavLink key={link.name} name={link.name} path={link.path} />
          ))}

          {/* القائمة المنسدلة */}
          <MenuRoot>
            <MenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                fontWeight="medium"
                _hover={{ bg: "transparent", color: "blue.500" }}
              >
                Community <Icon as={BiChevronDown} ml={1} />
              </Button>
            </MenuTrigger>
            <MenuContent>
              {dropdownLinks.map((link) => (
                <MenuItem key={link.name} value={link.name} asChild>
                  <a href={link.path} style={{ width: "100%" }}>
                    {link.name}
                  </a>
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>
        </HStack>

        {/* زر تسجيل الدخول السريع */}
        <Button
          as={RouterNavLink}
          to="/login"
          colorPalette="blue"
          size="sm"
          display={{ base: "none", md: "block" }}
        >
          Sign in
        </Button>

        {/* زر القائمة للموبايل */}
        <IconButton
          aria-label="Toggle Menu"
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </IconButton>
      </Flex>

      {/* روابط الموبايل تظهر عند الضغط على الزر */}
      {isOpen && (
        <Box pb={4} display={{ base: "block", md: "none" }}>
          <Stack as="nav" gap={3}>
            {navLinks.map((link) => (
              <CustomNavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

// مكون الروابط المخصص
const CustomNavLink = ({ name, path }) => (
  <Link
    as={RouterNavLink} 
    to={path}
    fontWeight="medium"
    fontSize="sm"
    color={{ base: "gray.600", _dark: "gray.300" }}
    _hover={{
      textDecoration: "none",
      color: "blue.500",  
    }}
    // تمييز الرابط النشط تلقائياً
    _activeLink={{
      color: "blue.600",
      fontWeight: "bold",
    }}
  >
    {name}
  </Link>
);