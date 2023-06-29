import React from 'react';
import PropTypes from 'prop-types';
import {Container, Header} from "./ContainerWithHeader.styles";

ContainerWithHeader.propTypes = {

};

function ContainerWithHeader({title, children}) {
    return (
        <>
            <Header>{title}</Header>
            <Container>{children}</Container>
        </>
    );
}

export default ContainerWithHeader;