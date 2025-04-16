import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { use } from 'react';
import { AutoContext } from '../../Context/Context';

function PagingComponent() {
    const { currentPage, totalPages, setCurrentPage, getAutos, amountOfCars } = use(AutoContext);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            getAutos(page, amountOfCars);
        }
    };

    return (
        <ButtonGroup>
            <Button
                variant="secondary"
                className='pag'
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </Button>
            <Button variant="secondary" className='pag'>
                {currentPage} / {totalPages}
            </Button>
            <Button
                variant="secondary"
                className='pag'
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </ButtonGroup>
    );
}

export default PagingComponent;
