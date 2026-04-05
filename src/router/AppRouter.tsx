import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, About} from '../pages';


export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}