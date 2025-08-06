import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import Header from "components/Header"
import type { Route } from "./+types/create-trips";

export const loader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,latlng,flag,maps');
    const data = await response.json();
  

    
    return data.map((country: any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }))
}

const CreateTrips = ({loaderData}: Route.ComponentProps) => {
    const handleSubmit = async () => {};
    const handleChange = (key: keyof TripFormData, value: string | number) => {}
    const countries = loaderData as Country[];
    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }))
    return (
        <main className = "flex flex-col gap-10 pb-20 wrapper">
            <Header title = "Add a New Trip" description = "View and Edit AI-generated travel plans"/>
            <section className = "mt-2.5 wrapper-md">
                <form className = "trip-form" onSubmit = {handleSubmit}>
                    <div>
                        <label htmlFor = "country">
                            Country
                        </label>
                        <ComboBoxComponent
                            id = "country"
                            dataSource = {countryData}
                            fields = {{text: 'text', value: 'value'}}
                            placeholder="Select a Country"
                            className = "combo-box"
                            change = {(e: {value: string | undefined}) => {
                                if(e.value) {
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering = {(e) => {
                                const query = e.text.toLowerCase();
                                e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => 
                                    ({
                                        text: country.name,
                                        value: country.value
                                    }))
                                ))
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            id = "duration"
                            name = "duration"
                            placeholder = "Enter a number of days (5,12).."
                        ></input>
                    </div>
                </form>
            </section>
        </main>
    )
}
export default CreateTrips