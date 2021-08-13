import React from 'react';

import './PageShader.css';

function Shader({ height }) {
    return <div className="shader" style={{ height: `clamp(60px, ${height}, 150px)` }} />;
}

Shader.defaultProps = {
    height: '10%',
};

export default Shader;
