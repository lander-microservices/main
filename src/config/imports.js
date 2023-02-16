import React from "react"

const Header1 = React.lazy(()=> import('components/Header1'));
const Footer1 = React.lazy(()=> import('components/Footer1'));

export const COMPONENTS = {
    Header1,
    Footer1
}

const Lander1 = React.lazy(()=> import('landers/Lander1'))
const Lander2 = React.lazy(()=> import('landers/Lander2'))

export const LANDERS = {
    Lander1,
    Lander2
}