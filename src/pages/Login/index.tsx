import '@aws-amplify/ui-react/styles.css';
import Navbar from '../../components/Navbar';
import { Authenticator, Heading, View, useTheme, useAuthenticator, Button } from '@aws-amplify/ui-react'
import { Navigate, useLocation } from 'react-router-dom';

const components = {

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Logue na sua conta
                </Heading>
            );
        },
        Footer() {
            const { toForgotPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                    >
                        Resetar Senha
                    </Button>
                </View>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Criar uma nova conta
                </Heading>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Voltar para o login
                    </Button>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Comfirme seu email
                </Heading>
            );
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Resetar sua senha
                </Heading>
            );
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Entre as informações:
                </Heading>
            );
        },
    },
};

const formFields = {
    signIn: {
        username: {
            placeholder: 'Entre seu email',
        },
        password: {
            label: 'Senha',
            placeholder: 'Entre sua senha',
        },
    },
    signUp: {
        email: {
            label: 'Email:',
            placeholder: 'Entre seu email',
            isRequired: false,
            order: 1,
        },
        password: {
            label: 'Senha:',
            placeholder: 'Crie sua senha',
            isRequired: false,
            order: 2,
        },
        confirm_password: {
            label: 'Comfirme sua senha:',
            order: 3,
        },
    },
    confirmSignUp: {
        confirmation_code: {
            label: 'Codigo:',
            placeholder: 'Entre o codigo enviado para o seu email',
        },
    },
    forceNewPassword: {
        password: {
            placeholder: 'Crie sua senha',
        },
    },
    forgotPassword: {
        username: {
            placeholder: 'Entre seu email',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Codigo',
            label: 'Entre o codigo enviado para o seu email:',
            isRequired: true,
        },
        password: {
            label: 'Nova senha:',
            placeholder: 'Entre sua nova senha',
        },
        confirm_password: {
            label: 'Comfirme nova senha:',
            placeholder: 'Entre sua nova senha novamente',
        },
    },
    setupTotp: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Entre seu codigo de confirmacao:',
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Entre seu codigo de confirmacao:',
            isRequired: false,
        },
    },
};

function Login() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');
    const returnUrl = redirect || '';

    return (
        <>
            <Navbar page="other" />
            <Authenticator formFields={formFields} components={components}>
                <Navigate to={`/${returnUrl}`} replace />
            </Authenticator>
        </>
    );
}

export default Login;